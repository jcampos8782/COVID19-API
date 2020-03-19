package com.jsoncampos.covid19.services;

import static com.google.common.base.Preconditions.checkArgument;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metric;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import com.jsoncampos.covid19.models.Covid19Cases;
import com.jsoncampos.covid19.repositories.Covid19CasesRepository;

@Service
public class CaseSearchServiceImpl implements CaseSearchService {
	
	private Covid19CasesRepository repository;
	
	@Autowired
	public CaseSearchServiceImpl(Covid19CasesRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<Covid19Cases> findCasesNear(double latitude, double longitude, double maxDistance, Metric metric) {
		checkArgument(Math.abs(latitude) <= 90, String.format("Invalid latitude %s", latitude));
		checkArgument(Math.abs(latitude) <= 180, String.format("Invalid longitude %s", longitude));
		checkArgument(maxDistance >= 0, String.format("Invalid maxDistance %f", maxDistance));
		
		return repository.findByGeoNear(new Point(longitude, latitude), new Distance(maxDistance, metric));
	}
}
