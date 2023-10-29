-- Create the database
CREATE DATABASE IF NOT EXISTS support_desk;
USE support_desk;

CREATE EXTENSION "uuid-ossp";

CREATE SCHEMA ticket_desk;

CREATE TABLE ticket_desk.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE ticket_desk.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id UUID NOT NULL,
  priority VARCHAR(10) NOT NULL DEFAULT 'low',
  status VARCHAR(20) NOT NULL DEFAULT 'open',
  assignee INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

ALTER TABLE ticket_desk.tickets
  ADD CONSTRAINT fk_tickets_category
  FOREIGN KEY (category_id)
  REFERENCES ticket_desk.categories(id);

-- ALTER TABLE ticket_desk.tickets
--   ADD CONSTRAINT fk_tickets_assigned_agent
--   FOREIGN KEY (assignee)
--   REFERENCES ticket_desk.users(id);

