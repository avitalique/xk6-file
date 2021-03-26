// Copyright 2021 Vitali Asheichyk
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE.txt file.

package file

import (
	"os"

	"github.com/loadimpact/k6/js/modules"
)

func init() {
	modules.Register("k6/x/file", new(FILE))
}

// FILE is the k6 extension.
type FILE struct{}

// Append a string to file
func (*FILE) AppendString(path string, s string) error {
	f, err := os.OpenFile(path,
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer f.Close()

	if _, err := f.WriteString(s); err != nil {
		return err
	}
	return nil
}
