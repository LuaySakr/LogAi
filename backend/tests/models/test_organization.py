import pytest
from sqlalchemy.orm import Session

from app.models.organization import Organization


def test_create_organization(db_session: Session):
    """Test creating an organization"""
    org = Organization(name="Test Org", slug="test-org")
    db_session.add(org)
    db_session.commit()
    
    assert org.id is not None
    assert org.name == "Test Org"
    assert org.slug == "test-org"
    assert org.is_active is True

def test_organization_relationships(db_session: Session):
    """Test organization relationships"""
    org = Organization(name="Test Org", slug="test-org")
    db_session.add(org)
    db_session.commit()
    
    # Test that relationships are accessible (they should be empty lists)
    assert org.users == []
    assert org.uploads == []
    assert org.summaries == []
    assert org.anomalies == []
    assert org.alert_rules == []