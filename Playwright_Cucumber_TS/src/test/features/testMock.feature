Feature: Add products to cart which is mocked byh api

  @Test
  Scenario: Test Mock
    When User mock "book" api with "book" data
    And User mock "categoryList" api with "categories" data
    Given User navigates to the application