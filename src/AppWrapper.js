import React from 'react';

import { UserProvider } from './contexts/UserContext';
import { WalletProvider } from './contexts/WalletContext';
import { MenuProvider } from './contexts/MenuContext';
import { ExpenseProvider } from './contexts/ExpenseContext';

import App from './App';

function AppWrapper() {
	return (
		<UserProvider>
			<WalletProvider>
				<MenuProvider>
					<ExpenseProvider>
						<App />
					</ExpenseProvider>
				</MenuProvider>
			</WalletProvider>
		</UserProvider>
	);
}

export default AppWrapper;
