package com.jsoncampos.covid19.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jsoncampos.covid19.models.Region;

public interface RegionRepository extends MongoRepository<Region,String> {
}
