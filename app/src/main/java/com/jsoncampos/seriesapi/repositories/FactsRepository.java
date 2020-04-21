package com.jsoncampos.seriesapi.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jsoncampos.seriesapi.models.Facts;

@Repository
public interface FactsRepository extends MongoRepository<Facts,String> {
	public Facts getOneByRegionId(ObjectId regionId);
}
