package com.jsoncampos.seriesapi.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jsoncampos.seriesapi.models.Demographics;

@Repository
public interface DemographicsRepository extends MongoRepository<Demographics,String> {
	public Demographics findOneByRegionId(ObjectId regionId);
}
