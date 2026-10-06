import pytest
from ai_gateway.tool_registry import ToolRegistry, ToolNotAllowedError


def test_approved_tools_allowed():
    assert ToolRegistry.is_tool_allowed("browser.navigate")
    assert ToolRegistry.is_tool_allowed("browser.click")
    assert ToolRegistry.is_tool_allowed("browser.snapshot")
    assert ToolRegistry.is_tool_allowed("browser.dom")


def test_unauthorized_tools_rejected():
    assert not ToolRegistry.is_tool_allowed("system.exec")
    assert not ToolRegistry.is_tool_allowed("os.system")
    assert not ToolRegistry.is_tool_allowed("shell.run")
    assert not ToolRegistry.is_tool_allowed("browser.eval_arbitrary_code")

    with pytest.raises(ToolNotAllowedError):
        ToolRegistry.validate_tool_request("system.shell", {"cmd": "whoami"})


def test_validate_valid_arguments():
    # Should not raise
    ToolRegistry.validate_tool_request("browser.click", {"selector": "#submit-btn"})
