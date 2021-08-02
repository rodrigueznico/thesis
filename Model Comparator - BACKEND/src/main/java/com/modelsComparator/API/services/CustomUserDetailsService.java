package com.modelsComparator.API.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.modelsComparator.API.domain.Role;
import com.modelsComparator.API.domain.User;
import com.modelsComparator.API.repositories.RoleRepository;
import com.modelsComparator.API.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;
	
	public User findUserByUsername(String username) {
	    return userRepository.findByUsername(username);
	}
	
	public void saveUser(User user, String role) {
	    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
	    Role userRole = roleRepository.findByRole(role);
	    user.setRoles(new HashSet<>(Arrays.asList(userRole)));
	    userRepository.save(user);
	}
	
	public void updateUser(User user, String role) {
	    Role userRole = roleRepository.findByRole(role);
	    user.setRoles(new HashSet<>(Arrays.asList(userRole)));
	    userRepository.save(user);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

	    User user = userRepository.findByUsername(username);
	    if(user != null) {
	        List<GrantedAuthority> authorities = getUserAuthority(user.getRoles());
	        return buildUserForAuthentication(user, authorities);
	    } else {
	        throw new UsernameNotFoundException("username not found");
	    }
	}
	
	private List<GrantedAuthority> getUserAuthority(Set<Role> userRoles) {
	    Set<GrantedAuthority> roles = new HashSet<>();
	    userRoles.forEach((role) -> {
	        roles.add(new SimpleGrantedAuthority(role.getRole()));
	    });

	    List<GrantedAuthority> grantedAuthorities = new ArrayList<>(roles);
	    return grantedAuthorities;
	}
	
	private UserDetails buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
	    return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), authorities);
	}
}
