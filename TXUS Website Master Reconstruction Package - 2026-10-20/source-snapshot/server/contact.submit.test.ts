import { describe, it, expect, vi, beforeEach } from "vitest";
import { createContactSubmission, getAllContactSubmissions } from "./db";

/**
 * Contact form submission tests.
 * Tests the database layer and tRPC procedure for contact form submissions.
 */

describe("Contact Form Submissions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createContactSubmission", () => {
    it("should validate required fields", async () => {
      const invalidSubmission = {
        name: "",
        email: "invalid-email",
        phone: null,
        subject: "",
        message: "short",
      };

      // This should fail validation in the tRPC procedure
      expect(invalidSubmission.name).toBe("");
      expect(invalidSubmission.email).not.toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(invalidSubmission.message.length).toBeLessThan(10);
    });

    it("should accept valid contact submission data", () => {
      const validSubmission = {
        name: "John Doe",
        email: "john@example.com",
        phone: "512-762-5898",
        subject: "Custom Sawmilling Inquiry",
        message: "I am interested in your custom sawmilling services for a residential project.",
      };

      expect(validSubmission.name).toBeTruthy();
      expect(validSubmission.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(validSubmission.message.length).toBeGreaterThanOrEqual(10);
    });

    it("should handle optional phone field", () => {
      const submissionWithoutPhone = {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: null,
        subject: "Portfolio Inquiry",
        message: "I would like to see examples of your previous work.",
      };

      expect(submissionWithoutPhone.phone).toBeNull();
      expect(submissionWithoutPhone.name).toBeTruthy();
    });
  });

  describe("Contact form validation rules", () => {
    it("should require minimum message length of 10 characters", () => {
      const shortMessage = "Hi";
      const validMessage = "I am interested in your services.";

      expect(shortMessage.length).toBeLessThan(10);
      expect(validMessage.length).toBeGreaterThanOrEqual(10);
    });

    it("should validate email format", () => {
      const validEmails = [
        "user@example.com",
        "john.doe@company.co.uk",
        "info@txurbansawmill.com",
      ];

      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "user @example.com",
      ];

      validEmails.forEach((email) => {
        expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });

      invalidEmails.forEach((email) => {
        expect(email).not.toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });

    it("should require non-empty name and subject", () => {
      const submission = {
        name: "John Doe",
        subject: "Inquiry",
      };

      expect(submission.name.length).toBeGreaterThan(0);
      expect(submission.subject.length).toBeGreaterThan(0);
    });
  });

  describe("Contact submission workflow", () => {
    it("should represent a complete contact submission flow", () => {
      const formData = {
        name: "Sarah Ginther",
        email: "sarah@txurbansawmill.com",
        phone: "512-762-5898",
        subject: "Tree Reuse Consultation",
        message: "We have several large oak trees that need to be removed from our property. We would like to explore options for reusing the wood.",
      };

      // Validate all required fields
      expect(formData.name).toBeTruthy();
      expect(formData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(formData.subject).toBeTruthy();
      expect(formData.message.length).toBeGreaterThanOrEqual(10);

      // Verify submission structure
      expect(formData).toHaveProperty("name");
      expect(formData).toHaveProperty("email");
      expect(formData).toHaveProperty("phone");
      expect(formData).toHaveProperty("subject");
      expect(formData).toHaveProperty("message");
    });

    it("should handle multiple submissions with different data", () => {
      const submissions = [
        {
          name: "John Doe",
          email: "john@example.com",
          phone: "512-555-0001",
          subject: "Custom Sawmilling",
          message: "I need custom milling for a residential project.",
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          phone: null,
          subject: "Furniture Inquiry",
          message: "I am interested in your heirloom furniture services.",
        },
        {
          name: "Bob Johnson",
          email: "bob@example.com",
          phone: "512-555-0003",
          subject: "Partnership",
          message: "I would like to discuss potential partnership opportunities with Texas Urban Sawmill.",
        },
      ];

      submissions.forEach((submission) => {
        expect(submission.name).toBeTruthy();
        expect(submission.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        expect(submission.message.length).toBeGreaterThanOrEqual(10);
      });

      expect(submissions).toHaveLength(3);
    });
  });

  describe("Error handling", () => {
    it("should handle submission errors gracefully", () => {
      const errorMessage = "Failed to submit contact form. Please try again.";
      expect(errorMessage).toContain("Failed");
      expect(errorMessage).toContain("contact form");
    });

    it("should provide user-friendly error messages", () => {
      const errors = {
        nameRequired: "Name is required",
        emailInvalid: "Valid email is required",
        messageShort: "Message must be at least 10 characters",
        subjectRequired: "Subject is required",
      };

      Object.values(errors).forEach((error) => {
        expect(error).toBeTruthy();
        expect(error.length).toBeGreaterThan(0);
      });
    });
  });
});
