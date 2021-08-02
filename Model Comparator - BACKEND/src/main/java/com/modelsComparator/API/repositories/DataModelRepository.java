package com.modelsComparator.API.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.modelsComparator.API.domain.DataModel;

public interface DataModelRepository extends MongoRepository<DataModel, String>{

}
