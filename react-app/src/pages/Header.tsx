import * as HoverCard from "@radix-ui/react-hover-card";
import "../css/hovercard.css";

const Header = () => {
  return (
    <header className="css-6osa3l">
      <div className="css-rnhepa">
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <div style={{ height: "100%" }}>
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
