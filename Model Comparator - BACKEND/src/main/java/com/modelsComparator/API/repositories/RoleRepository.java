package com.modelsComparator.API.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.modelsComparator.API.domain.Role;

public interface RoleRepository extends MongoRepository<Role, String> {

	Role findByRole(String role);
}
