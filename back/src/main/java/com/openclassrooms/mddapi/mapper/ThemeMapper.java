package com.openclassrooms.mddapi.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.ThemeDto;
import com.openclassrooms.mddapi.models.Theme;

@Component
public class ThemeMapper {
    @Autowired
    private ModelMapper modelMapper;
	
	public ThemeDto toDto(Theme theme) {
		ThemeDto themeDto = modelMapper.map(theme, ThemeDto.class);
	    return themeDto;
	}
	
	public List<ThemeDto> toDto(List<Theme> themeLst){
		List<ThemeDto> themeDtoLst =  new ArrayList<ThemeDto>();
		
		themeLst.forEach((theme)->{
			themeDtoLst.add(modelMapper.map(theme, ThemeDto.class));
		});
		return themeDtoLst;
	}
}