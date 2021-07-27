/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React, { ChangeEvent, useState } from "react";
import { EuiButton, EuiFormRow, EuiComboBox, EuiFlexGroup, EuiFlexItem, EuiFieldNumber } from "@elastic/eui";
import "brace/theme/github";
import "brace/mode/json";
import { ISMTemplate as ISMTemplateData } from "../../../../../models/interfaces";
import { ISM_TEMPLATE_INPUT_MAX_WIDTH } from "../../utils/constants";

interface ISMTemplateProps {
  template: ISMTemplateData;
  onUpdateTemplate: (template: ISMTemplateData) => void;
  onRemoveTemplate: () => void;
  isFirst: boolean;
}

const ISMTemplate = ({ template, onUpdateTemplate, onRemoveTemplate, isFirst }: ISMTemplateProps) => {
  // TODO: does this need to be up at top create policy?
  const [isInvalid, setInvalid] = useState(false);
  return (
    <EuiFlexGroup gutterSize="l" alignItems="center">
      <EuiFlexItem style={{ maxWidth: ISM_TEMPLATE_INPUT_MAX_WIDTH }}>
        <EuiFormRow isInvalid={false} error={null}>
          <EuiComboBox
            placeholder="Add index patterns"
            noSuggestions
            selectedOptions={template.index_patterns.map((pattern) => ({ label: pattern }))}
            onChange={(selectedOptions) => {
              onUpdateTemplate({ ...template, index_patterns: selectedOptions.map(({ label }) => label) });
              setInvalid(false);
            }}
            onCreateOption={(searchValue) => {
              if (!searchValue.trim()) {
                return false;
              }

              if (searchValue.includes(" ")) {
                setInvalid(false);
                return;
              }

              onUpdateTemplate({ ...template, index_patterns: [...template.index_patterns, searchValue] });
            }}
            onSearchChange={(searchValue) => {
              if (!searchValue) {
                setInvalid(false);

                return;
              }

              if (searchValue.includes(" ")) {
                setInvalid(true);
                return;
              }
              //TODO
              setInvalid(false);
            }}
            isClearable={true}
            isInvalid={isInvalid}
            data-test-subj="index-pattern-combo-box"
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFormRow error={null} isInvalid={false}>
          <EuiFieldNumber
            value={template.priority}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const priority = e.target.valueAsNumber;
              onUpdateTemplate({ ...template, priority });
            }}
            isInvalid={false}
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton color="danger" onClick={() => onRemoveTemplate()}>
          Remove
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default ISMTemplate;