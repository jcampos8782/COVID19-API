package com.jsoncampos.covid19.services;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metric;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import com.jsoncampos.covid19.models.Location;
import com.jsoncampos.covid19.models.Series;
import com.jsoncampos.covid19.repositories.LocationRepository;
import com.jsoncampos.covid19.repositories.SeriesRepository;

@Service
public class SeriesSearchServiceImpl implements SeriesSearchService {
	
	private SeriesRepository repository;
	private LocationRepository locationRepository;
	
	@Autowired
	public SeriesSearchServiceImpl(SeriesRepository repository, LocationRepository locationRepository) {
		this.repository = repository;
		this.locationRepository = locationRepository;
	}

	@Override
	public List<Series> findAll() {
		return repository.findAll();
	}
	
	@Override
	public List<Series> findSeriesNear(double latitude, double longitude, double maxDistance, Metric metric) {
		checkArgument(Math.abs(latitude) <= 90, String.format("Invalid latitude %s", latitude));
		checkArgument(Math.abs(latitude) <= 180, String.format("Invalid longitude %s", longitude));
		checkArgument(maxDistance >= 0, String.format("Invalid maxDistance %f", maxDistance));
		
		List<Location> locationsNearPoint = locationRepository
				.findByGeoNear(new Point(longitude, latitude), new Distance(maxDistance, metric));
		
		if (locationsNearPoint.isEmpty()) {
			return Arrays.asList();
		}
		
		var ids = locationsNearPoint.stream()
			.map(loc -> new ObjectId(loc.getRegionId()))
			.collect(Collectors.toList());
		
		return repository.findByRegionIdIn(ids);
	}
	
	@Override
	public List<Series> findSeriesByRegionId(String regionId) {
		checkNotNull(regionId, "region cannot be null");
		// TODO: Fix leaky abstraction of MongoDB
		return repository.findByRegionId(new ObjectId(regionId));
	}
}
