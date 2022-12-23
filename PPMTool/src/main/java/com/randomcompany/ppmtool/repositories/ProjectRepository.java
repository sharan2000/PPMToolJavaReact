package com.randomcompany.ppmtool.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.randomcompany.ppmtool.models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	Project findByProjectIdentifier(String projectId);
	
	List<Project> findByProjectLeader(String projectLeader);
	
	@Override
	List<Project> findAll();
}
