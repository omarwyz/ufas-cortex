-- ============================================
-- Seed Academic Structure
-- ============================================

-- Academic Years
INSERT INTO academic_years (id, name, "order", description) VALUES
  ('00000000-0000-0000-0000-000000000001', 'First Year', 1, 'Année préparatoire en sciences fondamentales'),
  ('00000000-0000-0000-0000-000000000002', 'Second Year', 2, 'Modules intégrés des systèmes'),
  ('00000000-0000-0000-0000-000000000003', 'Third Year', 3, 'UEI et UET'),
  ('00000000-0000-0000-0000-000000000004', 'Fourth Year', 4, 'Coming Soon'),
  ('00000000-0000-0000-0000-000000000005', 'Fifth Year', 5, 'Coming Soon'),
  ('00000000-0000-0000-0000-000000000006', 'Sixth Year', 6, 'Coming Soon');

-- First Year Semesters
INSERT INTO semesters (id, year_id, name, code, "order") VALUES
  -- Year 1
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Semester 1', 'S1', 1),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Semester 2', 'S2', 2),
  -- Year 2
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'U1 - Cardiovascular & Respiratory', 'U1', 1),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'U2 - Digestive', 'U2', 2),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'U3 - Urinary', 'U3', 3),
  ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'U4 - Endocrine & Reproductive', 'U4', 4),
  ('20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002', 'U5 - Nervous System', 'U5', 5),
  ('20000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 'U6 - Genetics', 'U6', 6),
  ('20000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', 'U7 - Immunology', 'U7', 7),
  -- Year 3
  ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'UEI 1', 'UEI1', 1),
  ('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'UEI 2', 'UEI2', 2),
  ('30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'UEI 3', 'UEI3', 3),
  ('30000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000003', 'UEI 4', 'UEI4', 4),
  ('30000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000003', 'UET - Thematic Units', 'UET', 5);

-- First Year - Semester 1 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('10000000-0000-0000-0000-000000000001', 'Anatomy', 'ANAT', 1),
  ('10000000-0000-0000-0000-000000000001', 'Cytology', 'CYTO', 2),
  ('10000000-0000-0000-0000-000000000001', 'Chemistry', 'CHEM', 3),
  ('10000000-0000-0000-0000-000000000001', 'Biochemistry', 'BIOC', 4),
  ('10000000-0000-0000-0000-000000000001', 'Biostatistics & Informatics', 'BIOS', 5),
  ('10000000-0000-0000-0000-000000000001', 'Biophysics', 'BPHY', 6),
  ('10000000-0000-0000-0000-000000000001', 'Embryology', 'EMBR', 7),
  ('10000000-0000-0000-0000-000000000001', 'Social Sciences & Humanities', 'SSH', 8);

-- First Year - Semester 2 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('10000000-0000-0000-0000-000000000002', 'Anatomy', 'ANAT', 1),
  ('10000000-0000-0000-0000-000000000002', 'Cytology', 'CYTO', 2),
  ('10000000-0000-0000-0000-000000000002', 'Chemistry', 'CHEM', 3),
  ('10000000-0000-0000-0000-000000000002', 'Biochemistry', 'BIOC', 4),
  ('10000000-0000-0000-0000-000000000002', 'Biophysics', 'BPHY', 5),
  ('10000000-0000-0000-0000-000000000002', 'Biostatistics & Informatics', 'BIOS', 6),
  ('10000000-0000-0000-0000-000000000002', 'Physiology', 'PHYS', 7),
  ('10000000-0000-0000-0000-000000000002', 'Histology', 'HIST', 8);

-- Second Year - U1 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('20000000-0000-0000-0000-000000000001', 'Anatomy', 'ANAT-U1', 1),
  ('20000000-0000-0000-0000-000000000001', 'Histology', 'HIST-U1', 2),
  ('20000000-0000-0000-0000-000000000001', 'Physiology', 'PHYS-U1', 3),
  ('20000000-0000-0000-0000-000000000001', 'Biophysics', 'BPHY-U1', 4);

-- Second Year - U2 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('20000000-0000-0000-0000-000000000002', 'Anatomy', 'ANAT-U2', 1),
  ('20000000-0000-0000-0000-000000000002', 'Histology', 'HIST-U2', 2),
  ('20000000-0000-0000-0000-000000000002', 'Physiology', 'PHYS-U2', 3),
  ('20000000-0000-0000-0000-000000000002', 'Biochemistry', 'BIOC-U2', 4);

-- Second Year - U3 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('20000000-0000-0000-0000-000000000003', 'Anatomy', 'ANAT-U3', 1),
  ('20000000-0000-0000-0000-000000000003', 'Histology', 'HIST-U3', 2),
  ('20000000-0000-0000-0000-000000000003', 'Physiology', 'PHYS-U3', 3),
  ('20000000-0000-0000-0000-000000000003', 'Biochemistry', 'BIOC-U3', 4);

-- Second Year - U4 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('20000000-0000-0000-0000-000000000004', 'Anatomy', 'ANAT-U4', 1),
  ('20000000-0000-0000-0000-000000000004', 'Histology', 'HIST-U4', 2),
  ('20000000-0000-0000-0000-000000000004', 'Physiology', 'PHYS-U4', 3),
  ('20000000-0000-0000-0000-000000000004', 'Biochemistry', 'BIOC-U4', 4);

-- Second Year - U5 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('20000000-0000-0000-0000-000000000005', 'Anatomy', 'ANAT-U5', 1),
  ('20000000-0000-0000-0000-000000000005', 'Histology', 'HIST-U5', 2),
  ('20000000-0000-0000-0000-000000000005', 'Physiology', 'PHYS-U5', 3),
  ('20000000-0000-0000-0000-000000000005', 'Biophysics', 'BPHY-U5', 4);

-- Second Year - U6 Genetics
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('20000000-0000-0000-0000-000000000006', 'Genetics', 'GENE', 1);

-- Second Year - U7 Immunology
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('20000000-0000-0000-0000-000000000007', 'Immunology', 'IMMU', 1);

-- Third Year - UEI 1 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('30000000-0000-0000-0000-000000000001', 'Medical Psychology', 'PSYC', 1),
  ('30000000-0000-0000-0000-000000000001', 'Semiology', 'SEMI-UEI1', 2),
  ('30000000-0000-0000-0000-000000000001', 'Physiopathology', 'PPATH-UEI1', 3),
  ('30000000-0000-0000-0000-000000000001', 'Radiology', 'RADIO-UEI1', 4),
  ('30000000-0000-0000-0000-000000000001', 'Clinical Biochemistry', 'CBIO-UEI1', 5);

-- Third Year - UEI 2 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('30000000-0000-0000-0000-000000000002', 'Semiology', 'SEMI-UEI2', 1),
  ('30000000-0000-0000-0000-000000000002', 'Physiopathology', 'PPATH-UEI2', 2),
  ('30000000-0000-0000-0000-000000000002', 'Radiology', 'RADIO-UEI2', 3),
  ('30000000-0000-0000-0000-000000000002', 'Clinical Biochemistry', 'CBIO-UEI2', 4);

-- Third Year - UEI 3 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('30000000-0000-0000-0000-000000000003', 'Semiology', 'SEMI-UEI3', 1),
  ('30000000-0000-0000-0000-000000000003', 'Physiopathology', 'PPATH-UEI3', 2),
  ('30000000-0000-0000-0000-000000000003', 'Radiology', 'RADIO-UEI3', 3),
  ('30000000-0000-0000-0000-000000000003', 'Clinical Biochemistry', 'CBIO-UEI3', 4);

-- Third Year - UEI 4 Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('30000000-0000-0000-0000-000000000004', 'Semiology', 'SEMI-UEI4', 1),
  ('30000000-0000-0000-0000-000000000004', 'Physiopathology', 'PPATH-UEI4', 2),
  ('30000000-0000-0000-0000-000000000004', 'Radiology', 'RADIO-UEI4', 3),
  ('30000000-0000-0000-0000-000000000004', 'Clinical Biochemistry', 'CBIO-UEI4', 4);

-- Third Year - UET Subjects
INSERT INTO subjects (semester_id, name, code, "order") VALUES
  ('30000000-0000-0000-0000-000000000005', 'Anatomy & Pathological Cytology', 'APAT', 1),
  ('30000000-0000-0000-0000-000000000005', 'Immunology', 'IMMU-UET', 2),
  ('30000000-0000-0000-0000-000000000005', 'Microbiology', 'MICB', 3),
  ('30000000-0000-0000-0000-000000000005', 'Parasitology & Mycology', 'PARA', 4),
  ('30000000-0000-0000-0000-000000000005', 'Clinical Pharmacology', 'PHARM', 5);