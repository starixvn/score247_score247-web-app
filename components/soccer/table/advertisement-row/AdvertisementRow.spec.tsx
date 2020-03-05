import React from "react";
import { shallow } from "enzyme";
import { Props } from "./type";
import AdvertisementRow from "./index";
import * as DeviceContext from "../../../../contexts/device-context";
import Advertisement from "../../../../advertisement";

describe("AdvertisementRow", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      href: "#",
      imageSrc: "image.jpg"
    };
  });

  it("should render advertisement component", () => {
    const wrapper = shallow(<AdvertisementRow {...props} />);
    const advertisement = wrapper.find(Advertisement).first();
    const actualProps = advertisement.props();

    expect(advertisement).not.toBeNull();
    expect(actualProps.href).toEqual(props.href);
    expect(actualProps.imageSrc).toEqual(props.imageSrc);
  });

  it("should render row with coldSpan=6 when isMobile is true", () => {
    const method = jest.spyOn(DeviceContext, "useDeviceContext");
    method.mockImplementation(() => ({ isMobile: true }));
    const wrapper = shallow(<AdvertisementRow {...props} />);
    const cell = wrapper.find("td").first();

    expect(cell.props().colSpan).toEqual(6);

    method.mockRestore();
  });

  it("should render row with coldSpan=9 when isMobile is false", () => {
    const wrapper = shallow(<AdvertisementRow {...props} />);
    const cell = wrapper.find("td").first();

    expect(cell.props().colSpan).toEqual(9);
  });
});
