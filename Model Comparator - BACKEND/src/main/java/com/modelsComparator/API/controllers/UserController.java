package com.modelsComparator.API.controllers;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.modelsComparator.API.configs.JwtTokenProvider;
import com.modelsComparator.API.domain.Role;
import com.modelsComparator.API.domain.User;
import com.modelsComparator.API.repositories.UserRepository;
import com.modelsComparator.API.services.CustomUserDetailsService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtTokenProvider jwtTokenProvider;

	@Autowired
	UserRepository usersRepository;

	@Autowired
	private CustomUserDetailsService userService;
	

	@GetMapping
    public ResponseEntity<?> users() {
		Iterable<User> users = usersRepository.findAll();
		for (User user : users) {
			user.setPassword("");
		}
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserBody data) {
		try {
			String username = data.getUsername();
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
			String token = jwtTokenProvider.createToken(username, this.usersRepository.findByUsername(username).getRoles());
			Map<Object, Object> model = new HashMap<>();
			model.put("id", this.usersRepository.findByUsername(username).getId());
			model.put("username", username);
			model.put("fullname", this.usersRepository.findByUsername(username).getFullname());
			model.put("startdate", this.usersRepository.findByUsername(username).getStartdate());
			model.put("email", this.usersRepository.findByUsername(username).getEmail());
			model.put("token", token);
			return new ResponseEntity<>(model, HttpStatus.OK);
		} catch (AuthenticationException e) {
			return new ResponseEntity<>("Invalid user/password supplied", HttpStatus.UNAUTHORIZED);
		}
	}
	
	@PostMapping("/confirmuser")
	public ResponseEntity<?> confirmUser(@RequestBody UserBody data) {
		User user = this.usersRepository.findByUsername(data.getUsername());
		if (user == null)
			return new ResponseEntity<>("correct password", HttpStatus.OK);
		else
			return new ResponseEntity<>("the username: " + data.getUsername() + " already exist", HttpStatus.CONFLICT);	
	}
	
	@PostMapping("/confirmpassword")
	public ResponseEntity<?> confirmPassword(@RequestBody UserBody data) {
		try {
			String username = data.getUsername();
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
			return new ResponseEntity<>("correct password", HttpStatus.OK);
		} catch (AuthenticationException e) {
			return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserBody data) {
		User user = new User();
		user.setUserName(data.getUsername());
		user.setPassword(data.getPassword());
		user.setFullname(data.getFullname());
		user.setStartdate(data.getStartdate());
		user.setEmail(data.getEmail());
		userService.saveUser(user, data.getRole());
		return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
	}
	
	@PostMapping("/update/{id}")
	public ResponseEntity<?> update(@PathVariable String id, @RequestBody UserBody data) {
		Optional<User> user = usersRepository.findById(id);
		if (!user.isPresent()) {
			return new ResponseEntity<>("User with id: " + id + " not found", HttpStatus.NOT_FOUND);
		}
		user.get().setFullname(data.getFullname());
		user.get().setEmail(data.getEmail());
		userService.updateUser(user.get(), data.getRole());
        return new ResponseEntity<>("User with username: " + id + " was updated", HttpStatus.OK);
	}
	
	@PostMapping("/updatepassword/{id}")
	public ResponseEntity<?> updatePassword(@PathVariable String id, @RequestBody UserBody data) {
		Optional<User> user = usersRepository.findById(id);
		if (!user.isPresent()) {
			return new ResponseEntity<>("User with id: " + id + " not found", HttpStatus.NOT_FOUND);
		}
		user.get().setPassword(data.getPassword());
		
		String role = "USER";
		for (Iterator<Role> it = user.get().getRoles().iterator(); it.hasNext();) {
			role = it.next().getRole();
			break;
		}
		
		userService.saveUser(user.get(), role);
        return new ResponseEntity<>("User with username: " + id + " was updated", HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
		Optional<User> user = usersRepository.findById(id);
		if (!user.isPresent()) {
			return new ResponseEntity<>("User with id: " + id + " not found", HttpStatus.NOT_FOUND);
		}
		usersRepository.deleteById(id);
        return new ResponseEntity<>("User with username: " + id + " was deteled", HttpStatus.OK);
    }
}
