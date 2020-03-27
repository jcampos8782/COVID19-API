package com.jsoncampos.covid19.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jsoncampos.covid19.models.Series;

public interface SeriesRepository extends MongoRepository<Series, Long> {
	@Query(value="{'location.regions': ?0 }")
	public List<Series> findByRegionId(ObjectId regionId);

	@Query(value="{'location._id': { $in: $0 }}")
	public List<Series> findByLocationIn(List<String> map);
}