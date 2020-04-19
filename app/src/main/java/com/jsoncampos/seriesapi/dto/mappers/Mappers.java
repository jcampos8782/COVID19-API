package com.jsoncampos.seriesapi.dto.mappers;

import com.jsoncampos.seriesapi.dto.DataDto;
import com.jsoncampos.seriesapi.dto.DemographicsDto;
import com.jsoncampos.seriesapi.dto.HeadlineDto;
import com.jsoncampos.seriesapi.dto.RegionDto;
import com.jsoncampos.seriesapi.dto.SeriesDto;
import com.jsoncampos.seriesapi.models.Data;
import com.jsoncampos.seriesapi.models.Demographics;
import com.jsoncampos.seriesapi.models.HeadlinesResponse.Article;
import com.jsoncampos.seriesapi.models.Region;
import com.jsoncampos.seriesapi.models.Series;

public class Mappers {
	public static DataDto convertToDto(Data model) {
		return new DataDto.Builder()
				.withRegions(model.getRegions())
				.withData(model.getData())
				.build();
	}
	
	public static RegionDto convertToDto(Region model) {
		return new RegionDto.Builder()
				.withId(model.getId())
				.withParentId(model.getParentId())
				.withName(model.getName())
				.build();
	}
	
	public static SeriesDto convertToDto(Series model) {
		return new SeriesDto.Builder()
				.withId(model.getId())
				.withName(model.getName())
				.withColumns(model.getColumns())
				.build();
	}
	
	public static HeadlineDto convertToDto(Article article) {
		HeadlineDto dto = new HeadlineDto();
		dto.setPublishedAt(article.getPublishedAt());
		dto.setSource(article.getSource().getName());
		dto.setTitle(article.getTitle());
		dto.setUrl(article.getUrl());
		return dto;
	}
	
	public static DemographicsDto convertToDto(Demographics demographics) {
		DemographicsDto dto = new DemographicsDto();
		dto.setPopulation(demographics.getPopulation());
		return dto;
	}
}
