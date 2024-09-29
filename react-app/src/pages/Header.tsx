import * as HoverCard from "@radix-ui/react-hover-card";
import "../css/hovercard.css";

const Header = () => {
  return (
    <header className="css-6osa3l">
      <div className="css-rnhepa">
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <div className="upbit_logo_box">
              <img
                alt="upbit_logo"
                src="https://cdn.upbit.com/upbit-web/images/upbit_logo_w.a7d73a6.svg"
              />
            </div>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content className="HoverCardContent" sideOffset={5}>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <a href="https://www.radix-ui.com/primitives/docs/components/hover-card">
                  <img
                    className="Image normal"
                    src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                    alt="Radix UI"
                  />
                </a>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 15 }}
                >
                  <div>
                    <div className="Text bold">Radix</div>
                    <div className="Text faded">@radix_ui</div>
                  </div>
                  <header className="mini-header local-link">
                    <a href="/">
                      <img
                        alt="upbit_logo"
                        src="https://cdn.upbit.com/upbit-web/images/upbit_logo_w.a7d73a6.svg"
                      />
                    </a>
                  </header>
                  <header className="mini-header upbit-link">
                    <a href="https://upbit.com/exchange">
                      <img
                        alt="upbit_logo"
                        src="https://cdn.upbit.com/upbit-web/images/upbit_logo_w.a7d73a6.svg"
                      />
                    </a>
                  </header>
                  <header className="mini-header api-link">
                    <a href="https://docs.upbit.com/reference/%EC%A0%84%EC%B2%B4-%EA%B3%84%EC%A2%8C-%EC%A1%B0%ED%9A%8C">
                      <img
                        alt="upbit_logo"
                        src="https://files.readme.io/40e45a0-small-upbit_color.png"
                      />
                    </a>
                  </header>
                </div>
              </div>

              <HoverCard.Arrow className="HoverCardArrow" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </div>
    </header>
  );
};

export default Header;
