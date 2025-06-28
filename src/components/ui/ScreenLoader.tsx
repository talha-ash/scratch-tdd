export const ScreenLoader = () => {
    return (
        <div id="split-logo-loader">
            <div className="logo-container">
                <img src="logo-path-1.png" alt="Top part of the logo" className="logo-half top" />
                <img
                    src="logo-path-2.png"
                    alt="Bottom part of the logo"
                    className="logo-half bottom"
                />
            </div>
        </div>
    );
};
