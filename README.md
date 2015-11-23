React Reconcilation
===================

Installation
------------

Start with installing Ruby/Rails dependencies:

```
bundle install
```

After successfull installation you can start your server:

```
bundle exec rails server
```

and visit the app at:

```
http://localhost:3000/imports/reconcile
```

By default it renders `400` rows (there are two collections of `200` rows
generated). To modify the amount of data, check `ImportsController` (line 35):

```ruby
MAX_ROWS = 200
```

Where ReactJS comes into the party
----------------------------------

To make assets management easier,
[`react-rails` gem](https://github.com/reactjs/react-rails) is used. It installs
ReactJS and sets environemnt (compiling `JSX`, transpiling `ES6`). Please refer
to its documentation for more information, here we have followed installation
steps without modifications.

Check `app/views/imports/reconcile.html.erb` where we're using our
`ReconciliationScreen` component:

```erb
<div class="row">
  <h2 class="text-center">Sagepay Reconciliation</h2>
</div>

<%= react_component("ReconciliationScreen", { sagepayTransactions: @sagepay_transactions,
                                              chopinTransactions:  @chopin_transactions }) %>

```

In `app/assets/javascripts/components/` you can find all components created for
building _Reconciliation Screen_.

In `app/assets/javascripts/components/transaction_row.es6.jsx` (line 2) there
is example of implementation of `shouldComponentUpdate` preventing component
from re-rendering if not required (this method has been uncommented during
presentation resulting with much more performant interface).

How about testing?
------------------

In order to reflect `Chopin` environemnt, we're using
[`Jasmine`](http://jasmine.github.io/) with
[`teaspoon-jasmine`](https://github.com/modeset/teaspoon), so
`bundle exec teaspoon` works picking our _JSX/ES6_ components.

For example of _Jasmine_ specs, please check `spec/javascripts/components/`.
