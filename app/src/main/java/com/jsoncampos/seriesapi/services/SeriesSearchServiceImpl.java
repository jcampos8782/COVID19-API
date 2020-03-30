package com.jsoncampos.seriesapi.services;

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

import com.jsoncampos.seriesapi.models.Data;
import com.jsoncampos.seriesapi.models.Location;
import com.jsoncampos.seriesapi.models.Series;
import com.jsoncampos.seriesapi.repositories.DataRepository;
import com.jsoncampos.seriesapi.repositories.LocationRepository;
import com.jsoncampos.seriesapi.repositories.SeriesRepository;

@Service
public class SeriesSearchServiceImpl implements SeriesSearchService {
	
	private SeriesRepository seriesRepository;
	private DataRepository dataRepository;
	private LocationRepository locationRepository;
	
	@Autowired
	public SeriesSearchServiceImpl(
			SeriesRepository seriesRepository,
			DataRepository dataRepository,
			LocationRepository locationRepository) {
		this.seriesRepository = seriesRepository;
		this.dataRepository = dataRepository;
		this.locationRepository = locationRepository;
	}

	@Override
	public Series find(String seriesId) {
		return seriesRepository.findById(seriesId).orElse(null);
	}
	
	@Override
	public List<Series> findAll() {
		return seriesRepository.findAll();
	}
	
	@Override
	public List<Data> findDataBySeriesId(String seriesId) {
		checkNotNull(seriesId, "seriesId cannot be null");
		return dataRepository.findBySeriesId(new ObjectId(seriesId));
	}
	
	@Override
	public List<Data> findDataNear(String seriesId, double latitude, double longitude, double maxDistance, Metric metric) {
		checkNotNull(seriesId, "seriesId cannot be null");
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
		
		return dataRepository.findByRegionIdIn(new ObjectId(seriesId), ids);
	}
	
	@Override
	public List<Data> findDataByRegionId(String seriesId, String regionId) {
		checkNotNull(seriesId, "seriesId cannot be null");
		checkNotNull(regionId, "region cannot be null");
		return dataRepository.findByRegionId(new ObjectId(seriesId), new ObjectId(regionId));
	}
}
