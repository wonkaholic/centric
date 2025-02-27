# Product Lifecycle Management - Technical Assessment

- This repository contains solutions for a technical assessment conducted for **Centric Software**, focused on **Product Lifecycle Management** (PLM). The code covers three main functionalities related to managing nodes, sections, and products in a BOM.
- There are comments in each file which is made to demostrate the thought process while doing the assessments.

## Table of Contents
1. [User Stories](#user-stories)
2. [Open Questions](#open-questions)

## User Stories

### 1. **Find Expired Nodes**
- **Scenario**: Given a list of facial serums (`node`) with their expiration dates, the system identifies expired serums. If a season (`container`) is specified, only expired serums from that season are returned; otherwise, all expired serums are returned.
- **Function Description**: To identify and remove outdated facial serums that are no longer on trend.
- **Analysis**: This function filters a collection of nodes to return those whose expiration date has passed, optionally filtering by a specified container.

### 2. **Find Matching Sections and Copy Section Item Values**
- **Scenario**: The product team decided to update the forumulation (`section`) for the serum, in this case, they can copy the existing serum to the new one, and update the ingredients or parts (`section item`) they wish to change.
- **Function Description**: To copy values from items in the "From" section to matching items in the "To" section based on their IDs, ensuring that only relevant changes are made.
- **Analysis**: This function copies values from items in the "From" section to matching items in the "To" section of a BOM, based on their IDs, and returns a list of the copy operations.

### 3. **Traverse and Find Matching Nodes**
- **Scenario**: The operation team would like to know whether the stock level (`node: qty`) of their products (`node`) or its parts (`node: children`) fall in a specific range, thus they can plan the production.
- **Function Description**: To identify and return products or parts whose quantity falls within a given range.
- **Analysis**: This function recursively traverses a tree-like structure of nodes and collects those whose quantity falls within a specified minimum and maximum range, returning the matching nodes.

---


## Open Questions

### 1. **Input Validation in a Controlled Environment**
- **Question**: Is input validation necessary when the expiration date is selected through a date picker or section IDs come from a controlled dropdown list?
- **Considerations**: While input validation is generally good practice, in a tightly controlled environment with predefined input fields, the risk of invalid data is reduced.

### 2. **Error Handling for Missing Nodes or Sections**
- **Question**: Should the system return an empty result or throw an error if the specified section or node is missing?
- **Considerations**: Throwing an error ensures immediate feedback, but could disrupt the flow. Returning an empty result may be less disruptive, depending on the use case.



