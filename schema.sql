-- AI导航站 PostgreSQL Schema（Supabase）
CREATE TABLE ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  url VARCHAR(500) NOT NULL,
  logo VARCHAR(500),
  description TEXT NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  pricing VARCHAR(20) NOT NULL DEFAULT 'freemium'
    CHECK (pricing IN ('free', 'freemium', 'paid')),
  china_accessible BOOLEAN NOT NULL DEFAULT false,
  need_vpn BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  monthly_visits BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tools_categories ON ai_tools USING GIN (categories);
CREATE INDEX idx_tools_slug ON ai_tools (slug);
CREATE INDEX idx_tools_china ON ai_tools (china_accessible);
CREATE INDEX idx_tools_featured ON ai_tools (is_featured);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON ai_tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE tool_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  description TEXT,
  category TEXT,
  submitter_email VARCHAR(200),
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
