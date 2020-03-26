package com.jsoncampos.covid19.services;

import java.util.List;

import org.springframework.data.geo.Metric;

import com.jsoncampos.covid19.models.Covid19Cases;

public interface CaseSearchService {
	List<Covid19Cases> findCasesByRegionId(String regionId);
	List<Covid19Cases> findCasesByMunicipalityId(String municipalityId);
	List<Covid19Cases> findCasesNear(double latitude, double longitude, double maxDistance, Metric metric);
}
