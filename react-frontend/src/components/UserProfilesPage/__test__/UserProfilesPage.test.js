import React from "react";
import { render, screen } from "@testing-library/react";

import UserProfilesPage from "../UserProfilesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userProfiles page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserProfilesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userProfiles-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userProfiles-add-button")).toBeInTheDocument();
});
