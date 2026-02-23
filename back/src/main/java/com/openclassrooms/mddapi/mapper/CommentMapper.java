package com.openclassrooms.mddapi.mapper;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Component;
import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.services.jwtToken.JWTService;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class CommentMapper {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private JWTService jwtService;
	
	public List<CommentDto> toDto(List<Comment> commentLst){
		List<CommentDto> commentDtoLst =  new ArrayList<CommentDto>();
		
		commentLst.forEach((comment)->{
			commentDtoLst.add(modelMapper.map(comment, CommentDto.class));
		});
		return commentDtoLst;
	}
	
	public Comment convertToEntity(CommentDto commentDto, HttpServletRequest request) throws ParseException {
		Comment comment = modelMapper.map(commentDto, Comment.class);
		comment.getUser().setId(Long.parseLong(this.jwtService.extractUserIdFromHttpRequest(request)));
	    return comment;
	}
}
