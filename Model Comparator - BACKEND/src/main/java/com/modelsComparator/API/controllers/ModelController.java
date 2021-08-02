package com.modelsComparator.API.controllers;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.modelsComparator.API.domain.DataModel;
import com.modelsComparator.API.domain.Model;
import com.modelsComparator.API.repositories.ModelRepository;
import com.modelsComparator.API.services.DataModelService;

@RestController
@RequestMapping("/api/models")
public class ModelController {

	@Autowired
    ModelRepository modelRepository;
	
	@Autowired
	private DataModelService dataModelService;

	@GetMapping("/all")
    public ResponseEntity<?> model() {
		Iterable<Model> models = modelRepository.findAll();
	    return new ResponseEntity<>(models, HttpStatus.OK);

    }

	@PostMapping("/add")
    public ResponseEntity<?> save(@RequestBody ModelBody modelBody) throws IOException {
		DataModel dataModel = dataModelService.save(modelBody.getModelData(), modelBody.getModelName());
		
		Model model = new Model();
		model.setModelData(dataModel);
		model.setIdUser(modelBody.getIdUser());
		model.setModelDate(modelBody.getModelDate());
		model.setModelName(modelBody.getModelName());
        modelRepository.save(model);
        
        return new ResponseEntity<>("model added successfully", HttpStatus.OK);
    }

	@GetMapping("/{idUser}")
    public ResponseEntity<?> findByIdUser(@PathVariable String idUser){
		Iterable<Model> models = modelRepository.findByIdUser(idUser);
		return new ResponseEntity<>(models, HttpStatus.OK);
    }

	@DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        Optional<Model> model = modelRepository.findById(id);
        modelRepository.delete(model.get());
        dataModelService.delete(model.get().getModelData().getId());
        return new ResponseEntity<>("model deleted", HttpStatus.OK);
    }
}
