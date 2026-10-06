from typing import Any, Dict, Set


class ToolNotAllowedError(Exception):
    def __init__(self, tool_name: str):
        super().__init__(f"Tool '{tool_name}' is not in the approved safety allowlist.")


class ToolRegistry:
    # Explicit tool whitelist strictly defined by master architecture
    ALLOWED_TOOLS: Set[str] = {
        # Browser action tools
        "browser.navigate",
        "browser.click",
        "browser.fill",
        "browser.type",
        "browser.select",
        "browser.check",
        "browser.uncheck",
        "browser.hover",
        "browser.scroll",
        "browser.press",
        "browser.wait",
        "browser.upload",
        "browser.download",
        # Observation tools
        "browser.snapshot",
        "browser.dom",
        "browser.accessibility_snapshot",
        "browser.network",
        "browser.console",
        "browser.current_state",
    }

    @classmethod
    def is_tool_allowed(cls, tool_name: str) -> bool:
        return tool_name in cls.ALLOWED_TOOLS

    @classmethod
    def validate_tool_request(cls, tool_name: str, arguments: Dict[str, Any]) -> None:
        if not cls.is_tool_allowed(tool_name):
            raise ToolNotAllowedError(tool_name)

        if not isinstance(arguments, dict):
            raise ValueError(f"Arguments for tool '{tool_name}' must be a dictionary.")
