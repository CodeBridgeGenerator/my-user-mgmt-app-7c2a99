import React from "react";
import { render, screen } from "@testing-library/react";

import UserProfilesCreateDialogComponent from "../UserProfilesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userProfiles create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserProfilesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userProfiles-create-dialog-component")).toBeInTheDocument();
});
