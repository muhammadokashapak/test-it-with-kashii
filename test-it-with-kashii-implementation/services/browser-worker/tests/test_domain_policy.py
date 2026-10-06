import pytest
from browser_worker.domain_policy import DomainPolicyEnforcer, DomainNotAllowedError


def test_domain_policy_enforcement():
    enforcer = DomainPolicyEnforcer(["example.com", "localhost"])

    assert enforcer.is_allowed("https://example.com/login")
    assert enforcer.is_allowed("http://sub.example.com/dashboard")
    assert enforcer.is_allowed("http://localhost:3000/app")

    assert not enforcer.is_allowed("https://malicious-site.com")
    assert not enforcer.is_allowed("https://example.com.attacker.com")
    assert not enforcer.is_allowed("")


def test_domain_policy_raises_on_invalid():
    enforcer = DomainPolicyEnforcer(["myapp.local"])
    with pytest.raises(DomainNotAllowedError):
        enforcer.validate("https://untrusted-external-site.org")
