package com.jsoncampos.covid19.services;

import java.util.List;

import com.jsoncampos.covid19.models.Region;

public interface RegionSearchService {
	public List<Region> findAll();
}
