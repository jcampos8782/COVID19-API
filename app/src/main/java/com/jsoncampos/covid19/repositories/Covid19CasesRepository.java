package com.jsoncampos.covid19.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jsoncampos.covid19.models.Covid19Cases;

public interface Covid19CasesRepository extends MongoRepository<Covid19Cases, Long> {
	@Query(value="{'location.region_id': ?0 }")
	public List<Covid19Cases> findByRegionId(ObjectId regionId);
	
	@Query(value="{'location.municipality_id': ?0 }")
	public List<Covid19Cases> findByMunicipalityId(ObjectId municipalityId);

	@Query(value="{'location._id': { $in: $0 }}")
	public List<Covid19Cases> findByLocationIn(List<String> map);
}