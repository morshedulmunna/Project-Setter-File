"use client";

import { BulkAction } from "@/common/data-table/BulkActions";
import { DataTable } from "@/common/data-table/DataTable";
import { generateColumnsFromData } from "@/common/data-table/generate-columns";
import { RowActions } from "@/common/data-table/RowActions";
import Input from "@/common/Input";
import Pagination from "@/common/Pagination";
import PageHeaderBox from "@/components/PageHeaderBox";
import { Eye, Pencil, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

export default function InstituteManagementPage({}: Props) {
  const [selectedTutorIds, setSelectedTutorIds] = useState<string[]>([]);

  const data = [
    {
      id: "1",
      name: "Jane Smith",
      jobTitle: "Math Tutor",
      city: "New York",
      mobile: "9876543210",
      email: "jane@example.com",
      status: "active",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-05",

      action: (
        <RowActions
          actions={[
            {
              label: "View",
              onClick: () => {
                console.log("View");
              },
              icon: <Eye size={16} />,
            },
            {
              label: "Edit",
              onClick: () => {
                console.log("Edit");
              },
              icon: <Pencil size={16} />,
            },
            {
              label: "Delete",
              onClick: () => {
                console.log("Delete");
              },
              icon: <Trash2 size={16} />,
              variant: "destructive",
            },
          ]}
        />
      ),
    },
    {
      id: "1",
      name: "Jane Smith",
      jobTitle: "Math Tutor",
      city: "New York",
      mobile: "9876543210",
      email: "jane@example.com",
      status: "active",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-05",

      action: (
        <RowActions
          actions={[
            {
              label: "View",
              onClick: () => {
                console.log("View");
              },
              icon: <Eye size={16} />,
            },
            {
              label: "Edit",
              onClick: () => {
                console.log("Edit");
              },
              icon: <Pencil size={16} />,
            },
            {
              label: "Delete",
              onClick: () => {
                console.log("Delete");
              },
              icon: <Trash2 size={16} />,
              variant: "destructive",
            },
          ]}
        />
      ),
    },
    {
      id: "1",
      name: "Jane Smith",
      jobTitle: "Math Tutor",
      city: "New York",
      mobile: "9876543210",
      email: "jane@example.com",
      status: "active",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-05",

      action: (
        <RowActions
          actions={[
            {
              label: "View",
              onClick: () => {
                console.log("View");
              },
              icon: <Eye size={16} />,
            },
            {
              label: "Edit",
              onClick: () => {
                console.log("Edit");
              },
              icon: <Pencil size={16} />,
            },
            {
              label: "Delete",
              onClick: () => {
                console.log("Delete");
              },
              icon: <Trash2 size={16} />,
              variant: "destructive",
            },
          ]}
        />
      ),
    },
    {
      id: "1",
      name: "Jane Smith",
      jobTitle: "Math Tutor",
      city: "New York",
      mobile: "9876543210",
      email: "jane@example.com",
      status: "active",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-05",

      action: (
        <RowActions
          actions={[
            {
              label: "View",
              onClick: () => {
                console.log("View");
              },
              icon: <Eye size={16} />,
            },
            {
              label: "Edit",
              onClick: () => {
                console.log("Edit");
              },
              icon: <Pencil size={16} />,
            },
            {
              label: "Delete",
              onClick: () => {
                console.log("Delete");
              },
              icon: <Trash2 size={16} />,
              variant: "destructive",
            },
          ]}
        />
      ),
    },
    {
      id: "1",
      name: "Jane Smith",
      jobTitle: "Math Tutor",
      city: "New York",
      mobile: "9876543210",
      email: "jane@example.com",
      status: "active",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-05",

      action: (
        <RowActions
          actions={[
            {
              label: "View",
              onClick: () => {
                console.log("View");
              },
              icon: <Eye size={16} />,
            },
            {
              label: "Edit",
              onClick: () => {
                console.log("Edit");
              },
              icon: <Pencil size={16} />,
            },
            {
              label: "Delete",
              onClick: () => {
                console.log("Delete");
              },
              icon: <Trash2 size={16} />,
              variant: "destructive",
            },
          ]}
        />
      ),
    },
    {
      id: "1",
      name: "Jane Smith",
      jobTitle: "Math Tutor",
      city: "New York",
      mobile: "9876543210",
      email: "jane@example.com",
      status: "active",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-05",

      action: (
        <RowActions
          actions={[
            {
              label: "View",
              onClick: () => {
                console.log("View");
              },
              icon: <Eye size={16} />,
            },
            {
              label: "Edit",
              onClick: () => {
                console.log("Edit");
              },
              icon: <Pencil size={16} />,
            },
            {
              label: "Delete",
              onClick: () => {
                console.log("Delete");
              },
              icon: <Trash2 size={16} />,
              variant: "destructive",
            },
          ]}
        />
      ),
    },
    {
      id: "1",
      name: "Jane Smith",
      jobTitle: "Math Tutor",
      city: "New York",
      mobile: "9876543210",
      email: "jane@example.com",
      status: "active",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-05",

      action: (
        <RowActions
          actions={[
            {
              label: "View",
              onClick: () => {
                console.log("View");
              },
              icon: <Eye size={16} />,
            },
            {
              label: "Edit",
              onClick: () => {
                console.log("Edit");
              },
              icon: <Pencil size={16} />,
            },
            {
              label: "Delete",
              onClick: () => {
                console.log("Delete");
              },
              icon: <Trash2 size={16} />,
              variant: "destructive",
            },
          ]}
        />
      ),
    },
    // Add more tutor data here
  ];

  // Generate columns from data
  const columns = generateColumnsFromData(data);

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedTutorIds(selectedIds);
  }, []);

  const bulkActions: BulkAction[] = [
    {
      label: "Delete Selected",
      variant: "destructive",
      onClick: async (selectedIds) => {
        // Replace with your actual delete API call
        // await deleteTutors(selectedIds);
        toast.success(`Successfully deleted ${selectedIds} tutors`);
      },
    },
    {
      label: "Activate Selected",
      variant: "outline",
      onClick: async (selectedIds) => {
        // Replace with your actual status update API call
        // await updateTutorStatus(selectedIds, "active");
        toast.success(`Successfully activated ${selectedIds.length} tutors`);
      },
    },
    {
      label: "Deactivate Selected",
      variant: "outline",
      onClick: async (selectedIds) => {
        // Replace with your actual status update API call
        // await updateTutorStatus(selectedIds, "inactive");
        toast.success(`Successfully deactivated ${selectedIds.length} tutors`);
      },
    },
  ];

  const handleActionComplete = useCallback(() => {
    setSelectedTutorIds([]);
  }, []);

  return (
    <>
      <PageHeaderBox className="mb-6" count={data.length} title="Institute Management" />
      {/* Enable scrolling here */}
      <div className="flex flex-col">
        <DataTable isBorderTopOnly isBorderBottomOnly limits={20} data={data} columns={columns} loading={false} idField="id" checkedHidden={true} />
        <Pagination numberOfData={123} limits={32} activePage={1} className="float-right mt-4" />
      </div>
    </>
  );
}
