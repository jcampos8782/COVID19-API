package com.jsoncampos.covid19.repositories;

import java.util.List;

import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jsoncampos.covid19.models.Covid19Cases;

public interface Covid19CasesRepository extends MongoRepository<Covid19Cases, Long> {
	
	@Query(sort= "{'date': -1}")
	public List<Covid19Cases> findByGeoNear(Point loction, Distance distance);
	
	@Query(value="{'location.region': ?0 }", sort="{'date': -1}")
	public List<Covid19Cases> findByRegion(String region);
}
