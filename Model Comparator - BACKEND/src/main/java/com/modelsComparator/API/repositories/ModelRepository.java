package com.modelsComparator.API.repositories;

import org.springframework.data.repository.CrudRepository;

import com.modelsComparator.API.domain.Model;

public interface ModelRepository extends CrudRepository<Model, String> {
	
	@Override
    void delete(Model deleted);
	
	Iterable<Model> findByIdUser(String idUser);
}
