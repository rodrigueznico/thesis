package com.modelsComparator.API.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.modelsComparator.API.domain.User;

public interface UserRepository extends MongoRepository<User, String> {

	User findByUsername(String username);
}
