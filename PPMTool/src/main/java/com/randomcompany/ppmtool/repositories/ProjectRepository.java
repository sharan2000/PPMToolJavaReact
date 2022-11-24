package com.randomcompany.ppmtool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.randomcompany.ppmtool.models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
	
}
