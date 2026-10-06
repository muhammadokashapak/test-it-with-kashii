from urllib.parse import urlparse
from typing import List


class DomainNotAllowedError(Exception):
    def __init__(self, url: str, allowed: List[str]):
        self.url = url
        self.allowed = allowed
        super().__init__(f"Target URL '{url}' is outside allowed domains: {allowed}")


class DomainPolicyEnforcer:
    def __init__(self, allowed_domains: List[str]):
        self.allowed_domains = [d.strip().lower() for d in allowed_domains if d.strip()]

    def is_allowed(self, target_url: str) -> bool:
        if not target_url:
            return False

        parsed = urlparse(target_url)
        hostname = (parsed.hostname or "").lower()

        if not hostname:
            return False

        for allowed in self.allowed_domains:
            # Exact match
            if hostname == allowed:
                return True
            # Subdomain match
            if hostname.endswith("." + allowed):
                return True

        return False

    def validate(self, target_url: str) -> None:
        if not self.is_allowed(target_url):
            raise DomainNotAllowedError(target_url, self.allowed_domains)
