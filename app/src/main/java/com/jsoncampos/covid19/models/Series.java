package com.jsoncampos.covid19.models;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.google.gson.Gson;

@Document("series")
public class Series {
	
	@Id
	private String id;
	
	@Field("data")
	private Map<String,List<Object>> data;
	
	@Field("location")
	private Series.Location location;

	public Map<String,List<Object>> getData() {
		return data;
	}

	public void setData(Map<String,List<Object>> data) {
		this.data = data;
	}

	public Series.Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
	
	@Override
	public String toString() {
		return new Gson().toJson(this).toString();
	}
	
	public static class Location {
		
		@Field("_id")
		private String locationId;

		@Field("regions")
		private List<String> regions;
		
		public List<String> getRegions() {
			return regions;
		}

		public void setRegions(List<String> regions) {
			this.regions = regions;
		}
		
		public String getLocationId() {
			return locationId;
		}

		public void setLocationId(String locationId) {
			this.locationId = locationId;
		}
	}
}
