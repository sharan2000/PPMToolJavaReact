package com.randomcompany.ppmtool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.randomcompany.ppmtool.models.Backlog;

@Repository
public interface BacklogRepository extends JpaRepository<Backlog, Long> {
	Backlog findByProjectIdentifier(String projectIdentifier);
}
