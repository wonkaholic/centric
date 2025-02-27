# Product Lifecycle Management - Technical Assessment

- This repository contains solutions for a technical assessment conducted for **Centric Software**, focused on **Product Lifecycle Management** (PLM). The code covers three main functionalities related to managing nodes, sections, and products in a BOM.
- There are comments in each file which is made to demostrate the thought process while doing the assessments.

## Table of Contents
1. [User Stories](#user-stories)
2. [Technical Decisions](#technical-decisions)
3. [Open Questions](#open-questions)

## User Stories

### 1. **Find Expired Nodes**
- **Node**: Facial serum.
- **Container**: Season.
- **Function Description**: To identify and remove outdated facial creams that are no longer on trend.
- **Scenario**: Given a list of facial serums with their expiration dates, the system identifies expired serums. If a **season** is specified, only expired serums from that season are returned; otherwise, all expired serums are returned.

### 2. **Find Matching Sections and Copy Section Item Values**
- **Node**: Section Items in the BOM.
- **Container**: Section IDs.
- **Function Description**: To ensure that values from the "From" section are copied to matching items in the "To" section.
- **Scenario**: In the context of BOM in manufacturing, a product consists of several parts, and each part has specific properties. We can update an old BOM section with values from a new BOM section to ensure consistency across sections.

### 3. **Traverse and Find Matching Nodes**
- **Node**: Product Nodes with quantities.
- **Container**: Child nodes (subcategories or parts).
- **Function Description**: To identify products or parts whose quantities fall within a specific range. 
- **Scenario**: In a warehouse management system, each product might have a quantity (stock level) associated with it. We can identify products that have stock quantities between a certain range, for instance, products with stock levels between 10 and 100 units.

---

## Technical Decisions

### 1. **Destructuring**
- **Decision**: Destructuring is used to simplify access to specific values from objects and arrays.
- **Example**: `const { container, expiration } = params;`
- **Reasoning**: This approach makes the code more concise and readable by directly accessing only the needed properties.

### 2. **Helper Functions**
- **Decision**: Helper functions like `copy` are used to modularize common tasks.
- **Example**: The `copy` function creates and returns an object of type `ICopyOperation` containing the `from`, `to`, and `value` properties.
- **Reasoning**: By using helper functions, the code becomes more maintainable and reusable, reducing code duplication.

### 3. **Input Validation**
- **Decision**: Input validation is implemented to ensure that critical parameters like `expiration` and section IDs are valid.
- **Example**: In `find_expired_nodes.ts`, the expiration date is validated to ensure it’s a `Date` object.
- **Reasoning**: Input validation prevents runtime errors and ensures the system behaves as expected, even in controlled environments.

---

## Open Questions

### 1. **Input Validation in a Controlled Environment**
- **Question**: Is input validation necessary when the expiration date is selected through a date picker or section IDs come from a controlled dropdown list?
- **Considerations**: While input validation is generally good practice, in a tightly controlled environment with predefined input fields, the risk of invalid data is low.

### 2. **Error Handling for Missing Nodes or Sections**
- **Question**: Should the system return an empty result or throw an error if the specified section or node is missing?
- **Considerations**: Throwing an error ensures immediate feedback, but could disrupt the flow. Returning an empty result may be less disruptive, depending on the use case.



