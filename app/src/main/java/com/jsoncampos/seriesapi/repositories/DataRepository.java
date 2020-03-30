package com.jsoncampos.seriesapi.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jsoncampos.seriesapi.models.Data;

public interface DataRepository extends MongoRepository<Data, Long> {
	
	public List<Data> findBySeriesId(ObjectId seriesId);
	
	@Query(value="{'series_id': ?0, 'regions': ?1 }")
	public List<Data> findByRegionId(ObjectId seriesId, ObjectId regionId);

	@Query(value="{'series_id': ?0, 'regions': { $in: ?1 }}")
	public List<Data> findByRegionIdIn(ObjectId seriesId, List<ObjectId> regionIds);
}