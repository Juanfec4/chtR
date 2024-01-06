import { IconTestPipe } from "@tabler/icons-react";
import { fireEvent, render } from "@testing-library/react";
import OutlineButton from ".";

describe("Outline Button", () => {
  it("renders icon element", () => {
    const { getByTestId } = render(<OutlineButton text="test button" Icon={IconTestPipe} />);
    const iconElement = getByTestId("icon-element");

    expect(iconElement).toBeTruthy();
  });

  it("renders button text", () => {
    const buttonText = "test button";
    const { getByText } = render(<OutlineButton text={buttonText} Icon={IconTestPipe} />);
    const buttonTextElement = getByText(buttonText);

    expect(buttonTextElement).toBeTruthy();
  });

  it("calls onClick handler", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <OutlineButton text="test button" Icon={IconTestPipe} clickFn={onClickMock} />
    );
    const buttonElement = getByText("test button");

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
