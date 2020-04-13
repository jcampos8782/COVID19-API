package com.jsoncampos.seriesapi.repositories;

import java.util.List;

import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.jsoncampos.seriesapi.models.Location;

@Repository
public interface LocationRepository extends MongoRepository<Location,String>{
	public List<Location> findByGeoNear(Point loction, Distance distance);
}
