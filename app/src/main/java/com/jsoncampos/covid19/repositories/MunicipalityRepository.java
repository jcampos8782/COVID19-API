package com.jsoncampos.covid19.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jsoncampos.covid19.models.Municipality;

public interface MunicipalityRepository extends MongoRepository<Municipality,String> {
	@Query(value="{'region_id': ?0}", sort = "{'name': 1}")
	List<Municipality> findByRegionId(ObjectId regionId);
}
