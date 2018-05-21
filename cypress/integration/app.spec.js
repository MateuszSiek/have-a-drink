describe('Main app', () => {
	beforeEach(function () {
		cy.visit('/');
	});

	const getCurrentDrinkName = () => {
		return cy.get('app-drinks-list li.active').then(( $el ) => {
			return $el.html().trim();
		});
	};

	const validateDrinkName = () => {
		// drink name in the header should be the same as selected in the list
		getCurrentDrinkName().then(( activeDrinkName ) => {
			activeDrinkName.split('').forEach(( letter, idx ) => {
				cy.get(`app-title .div--current-title span:nth-of-type(${idx + 1}n)`)
				  .should('contain', letter);
			});
			cy.location().should(( location ) => {
				expect(location.href).to.contain('/?drink=' + activeDrinkName.toLowerCase());
			});
		});
	};

	it('Have initial content', () => {
		cy.get('.loading-label').should('contain', 'LOADING');

		cy.get('app-header').should('contain', 'HAVE A DRINK');
		cy.get('app-header').should('contain', 'VISUALISATION THAT WILL HELP YOU PREPARE YOUR FAVOURITE COCKTAIL');
		cy.get('app-footer').should('contain', 'Mateusz Siek');
		cy.get('app-description p').should('be.visible');

		// we should have more than 60 drink in the list and more than 11 types of alcohols
		cy.get('app-drinks-list').within(() => {
			cy.get('ul li').should('have.length.greaterThan', 60);
			cy.get('.filters .filter-button').should('have.length.greaterThan', 11);
			cy.get('ul li.active').should('have.length', 1);
		});

		// all filters should be active
		cy.get('app-drinks-list .filter-button.active').its('length').then(( activeFiltersCount ) => {
			cy.get('app-drinks-list .filter-button').should('have.length', activeFiltersCount);
		});

		validateDrinkName();

		// there should be the same number of layers in the drink and in the ingredients list
		cy.get('app-visualisation svg .ingredient-layer').its('length').then(( length ) => {
			cy.get('.ingredients-list ul').find('li').should('have.length', length);
		});
	});

	it('Should navigate between drinks', () => {
		getCurrentDrinkName().then(( currentDrinkName ) => {
			cy.get('.navigation-buttons .next-button').click();
			// should open next drink
			getCurrentDrinkName().then(( nextDrinkName ) => {
				expect(nextDrinkName).not.to.equal(currentDrinkName);
				validateDrinkName();
			});

			// should navigate back to initial drink
			cy.get('.navigation-buttons .prev-button').click();
			getCurrentDrinkName().then(( prevDrinkName ) => {
				expect(prevDrinkName).to.equal(currentDrinkName);
			});

			// should navigate to drink by using list
			cy.get('app-drinks-list ul a:nth-of-type(17) li').click();
			getCurrentDrinkName().then(( nextDrinkName ) => {
				expect(nextDrinkName).not.to.equal(currentDrinkName);
				validateDrinkName();
			});
		});
	});

	it('Should filter drinks', () => {
		cy.get('app-drinks-list').within(() => {
			cy.get('.filter-button.whisky').click();
			cy.get('.filter-button.active').should('have.length', 1);

			// only drinks containing whisky should be visible
			cy.get('ul a li').its('length').then(( visibleDrinksCount ) => {
				cy.get('ul a.whisky li').should('have.length', visibleDrinksCount);
			});

			cy.get('.filter-button.vodka').click();
			cy.get('.filter-button.active').should('have.length', 2);

			// only drinks containing whisky and vodka should be visible
			cy.get('ul a li').its('length').then(( visibleDrinksCount ) => {
				cy.get('ul a.whisky li,ul a.vodka li').should('have.length', visibleDrinksCount);
			});

			cy.get('.filters .reset').click();

			// all filter buttons should be active after reset
			cy.get('.filter-button.active').its('length').then(( activeFiltersCount ) => {
				cy.get('.filter-button').should('have.length', activeFiltersCount);
			});
		});
	});

	it('Should search drinks', () => {
		cy.get('app-drinks-list').within(() => {
			cy.get('ul a li').its('length').then(( allDrinkCount ) => {
				cy.get('.search-box input').type('da');
				// after search there should be less drinks than before
				cy.get('ul a li').should('have.length.below', allDrinkCount);

				cy.get('.search-box input').clear();
				cy.get('ul a li').should('have.length', allDrinkCount);

				// when searching for specific drink only one should be visible in the list
				cy.get('ul a li').first().then(( $firstDrinkEl ) => {
					console.log($firstDrinkEl);
					cy.get('.search-box input').type($firstDrinkEl.text().trim());
					cy.get('ul a li').should('have.length', 1);
				});
			});
		});
	});

	it('should display properly on mobile screens', () => {
		cy.viewport('iphone-5');

		cy.get('.loading-label').should('contain', 'LOADING');

		cy.get('app-header').should('contain', 'HAVE A DRINK');
		cy.get('app-header .sub-title').should('not.be.visible');
		cy.get('app-footer').should('contain', 'Mateusz Siek');
		cy.get('app-description p').should('be.visible');
		cy.get('app-visualisation svg').should('be.visible');

		cy.get('app-drinks-list .main-container').should('not.be.visible');
		cy.get('app-drinks-list .list-visibility.show-list').should('be.visible');

		cy.get('.navigation-buttons-mobile .prev-panel').should('be.visible');
		cy.get('.navigation-buttons-mobile .next-panel').should('be.visible');

		cy.get('app-drinks-list .list-visibility.show-list').click();
		cy.get('app-drinks-list .main-container').should('be.visible');
		cy.get('app-drinks-list ul li').should('have.length.greaterThan', 60);

		cy.get('app-drinks-list .list-visibility.hide-list').click();
		cy.get('app-drinks-list .main-container').should('not.be.visible');
	});
});
