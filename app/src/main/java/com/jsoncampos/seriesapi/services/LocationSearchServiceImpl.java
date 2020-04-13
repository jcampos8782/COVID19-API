package com.jsoncampos.seriesapi.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import com.jsoncampos.seriesapi.models.Location;
import com.jsoncampos.seriesapi.repositories.LocationRepository;

@Service
public class LocationSearchServiceImpl implements LocationSearchService {

	private LocationRepository repository;
	
	@Autowired
	public LocationSearchServiceImpl(LocationRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Location findClosestLocation(double latitude, double longitude) {
		List<Location> nearbyLocations = new ArrayList<>();
		int distance = 50;
		while (nearbyLocations.isEmpty()) {
			nearbyLocations = repository.findByGeoNear(new Point(longitude, latitude), new Distance(distance, Metrics.MILES));
			distance *= 10;
		}
		return nearbyLocations.get(0);
	}

}
